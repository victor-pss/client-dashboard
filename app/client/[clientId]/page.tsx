'use client';
import * as React from 'react';
import CryptoJS from 'crypto-js';
import Card from '../../components/Card';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';

async function fetchData(url: string): Promise<any> {
  const response = await fetch(url, { cache: 'force-cache', next: { revalidate: 300 } });
  const data = await response.json();
  // console.log(data.data);
  return data.data;
}

interface CustomField {
  id: string;
  value: string;
}

interface TaskData {
  id: string;
  status: string;
  description: string;
  title: string;
  customFields: CustomField[];
}

interface FolderData {
  id: string;
  title: string;
  customFields: CustomField[];
}

function setLocalStorageWithExpiry(key: string, value: string, ttl: number): void {
  const now = new Date();
  const milli = ttl * 1000;
  const item = {
    value: value,
    expiry: now.getTime() + milli,
  }
  localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageWithExpiry(key: string): any {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  const item = JSON.parse(value);
  let val;
  if (item.value[0] === "[") {
    val = JSON.parse(item.value);
  } else {
    val = item.value;
  }

  console.log("item:", item);
  console.log("val:", val);

  const now = new Date();

  if (now.getTime() >= item.expiry) {
    localStorage.removeItem(key);
    return null
  }
  return val;
}

export default function Home({ params }: any) {
  const [clientId, setClientId] = React.useState<string | null>(null);
  const [clientIdPlain, setClientIdPlain] = React.useState<string | null>(null);
  const [folderData, setFolderData] = React.useState<FolderData[]>([]);
  const [projectManager, setProjectManager] = React.useState<string | null>(null);
  const [taskData, setTaskData] = React.useState<TaskData[]>([]);
  const [activeTasks, setActiveTasks] = React.useState<TaskData[]>([]);
  const [completedTasks, setCompletedTasks] = React.useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const decoded = decodeURIComponent(params.clientId);
    setClientId(decoded);

    // setPM(getServerSideJSON());
  }, []);

  React.useEffect(() => {

    if (clientId !== null) {
      const secretKey = process.env.NEXT_PUBLIC_SECRET_ENC_KEY;
      if (!secretKey) {
        throw new Error(`Secret encrytion key is not defined`);
      }
      const decrypted = CryptoJS.AES.decrypt(clientId, secretKey);
      // console.log('decoded');
      // console.log(decrypted.toString(CryptoJS.enc.Utf8));
      setClientIdPlain(decrypted.toString(CryptoJS.enc.Utf8));
    }
  }, [clientId]);

  React.useEffect(() => {

    if (clientIdPlain !== null) {
      const fetchDataAndSetState = async () => {
        const apiHost = process.env.NEXT_PUBLIC_PM_API_HOST;
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        if (!apiHost || !accessToken) {
          throw new Error(`API host or access token is not defined`);
        }
        const url = `${apiHost}folders?access_token=${accessToken}&fields=['customFields','description']&customFields=[{'id':'IEACF6UMJUAA6L3V','comparator':'EqualTo','value':'C: Dashboard'}, {'id':'IEACF6UMJUAA6LOM','comparator':'EqualTo','value':'${clientIdPlain}'}]`

        try {
          const data = await fetchData(url);
          setFolderData(data as FolderData[]);
          setLocalStorageWithExpiry("folderData", JSON.stringify(data), 300);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      if (localStorage.getItem("folderData") !== null) {
        let decoded = getLocalStorageWithExpiry("folderData");
        console.log("folderData:", decoded);
        if (decoded === null) {
          fetchDataAndSetState();
          console.log("folderData - localStorage null");
        } else {
          setFolderData(decoded as FolderData[]);
          console.log("folderData - no localStorage");
        }
      } else {
        fetchDataAndSetState();
        console.log("folderData - localStorage none");
      }
    }
  }, [clientIdPlain]);

  React.useEffect(() => {
    if (folderData.length !== 0) {
      const getFolderDataAndSetState = async () => {
        const url = process.env.NEXT_PUBLIC_PM_API_HOST + "folders/" + folderData[0].id + "/tasks?access_token=" + process.env.NEXT_PUBLIC_ACCESS_TOKEN + "&fields=['description','customFields']";

        try {
          const data = await fetchData(url);
          setTaskData(data as TaskData[]);
          setLocalStorageWithExpiry("taskData", JSON.stringify(data), 300);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      if (localStorage.getItem("taskData") !== null) {
        const decoded = getLocalStorageWithExpiry("taskData");
        if (decoded === null) {
          getFolderDataAndSetState();
        } else {
          setTaskData(decoded as TaskData[]);
          setIsLoading(false);
        }
      } else {
        getFolderDataAndSetState();
      }

      folderData[0].customFields.forEach((field: CustomField) => {
        if (field.id === 'IEACF6UMJUADCGYR') {
          setProjectManager(field.value);
        }
      });
    }

  }, [folderData]);

  React.useEffect(() => {
    taskData.forEach((task: TaskData) => {
      if (task.status === 'Active') {
        setActiveTasks(prevTasks => [...prevTasks, task]);
      } else if (task.status === 'Completed') {
        setCompletedTasks(prevTasks => [...prevTasks, task]);
      }
    });
  }, [taskData]);

  return (
    <Nav clientId={clientIdPlain ? clientIdPlain : ""} projectManager={projectManager ? projectManager : ""} title='Project Dashboard'>
      {isLoading ? (
        <div className="w-6/12 text-center m-auto mt-5">
          <Loading />
        </div>
      ) : (

        <div className="pt-4 w-8/12 m-auto">
          <div id='progress' className='mx-auto'>
            <ol className="flex items-center w-full">
              <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
              </svg>
                </span>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                  </svg>
                </span>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                  </svg>
                </span>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                  </svg>
                </span>
              </li>
              <li className="flex items-center w-full">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                  </svg>
                </span>
              </li>
            </ol>
          </div>
          <div className="flex flex-row gap-4 m-auto justify-center">
            <div className="w-full">
              <p className="text-xl font-semibold text-gray-800 text-center mb-2 w-full">Active Tasks :</p>
              {
                activeTasks && activeTasks.length > 0 ? (
                  activeTasks.map((task: TaskData) => (
                    <Card
                      status={task.status}
                      key={task.id}
                      title={task.title}
                      id={task.id}
                      description={task.description}
                    />

                  ))
                ) : (
                  // TODO: change this so that it's a card instead
                  <p>No active tasks just yet.</p>
                )
              }
            </div >
            <div className="w-full">
              <p className="text-xl font-semibold text-gray-800 text-center mb-2 w-full">Completed Tasks:</p>
              {completedTasks && completedTasks.length > 0 ? (
                completedTasks.map((task: TaskData) => (
                  <Card
                    status={task.status}
                    key={task.id}
                    title={task.title}
                    id={task.id}
                    description={task.description}
                  />

                ))
              ) : (
                // TODO: change this so that it's a card instead
                <p>No completed tasks just yet.</p>
              )}
            </div>
          </div >
        </div >
      )}
    </Nav >
  )
}
