'use client';
import * as React from 'react';
import * as Constants from '../../utils/constants';
import CryptoJS from 'crypto-js';
import Card from '../../components/Card';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';
import Pizza from '../../components/pizza';

async function fetchData(url: string): Promise<any> {
  const response = await fetch(url, { cache: 'force-cache', next: { revalidate: 300 } });
  const data = await response.json();
  // console.log(data.data);
  // console.log('nothing to see here');
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

function setLocalStorageWithExpiry(key: string, value: string, ttl: number, clientId: string): void {
  const now = new Date();
  const milli = ttl * 1000;
  const item = {
    value: value,
    expiry: now.getTime() + milli,
    clientID: clientId,
  }
  localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageWithExpiry(key: string, clientId: string): any {
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

  console.log('key:', clientId);
  console.log('item.clientID:', item.clientID);
  if (now.getTime() >= item.expiry || clientId != item.clientID) {
    localStorage.removeItem(key);
    return null
  }
  return val;
}

export default function Home({ params }: any) {
  const [clientId, setClientId] = React.useState<string | null>(null);              // encrypted Client ID
  const [clientIdPlain, setClientIdPlain] = React.useState<string | null>(null);    // decrypted Client ID
  const [folderData, setFolderData] = React.useState<FolderData[]>([]);             // Wrike folder data for Project Dashboard
  const [projectManager, setProjectManager] = React.useState<string | null>(null);  // Project Manager from Wrike folder data
  const [taskData, setTaskData] = React.useState<TaskData[]>([]);                   // Task data based on Wrike folder
  const [activeTasks, setActiveTasks] = React.useState<TaskData[]>([]);             // Separated active tasks
  const [completedTasks, setCompletedTasks] = React.useState<TaskData[]>([]);       // Separated completed tasks
  const [isLoading, setIsLoading] = React.useState<boolean>(true);                  // Loading state
  const [projectPhase, setProjectPhase] = React.useState<string | null>(null);      // Current project phases based on Wrike folder data

  const expiry = Constants.EXPIRY; // Local storage expiration (in seconds)

  React.useEffect(() => {
    const decoded = decodeURIComponent(params.clientId);
    setClientId(decoded);

     //setPM(getServerSideJSON());
  }, [params.clientId]);

  React.useEffect(() => {

    if (clientId !== null) {
      const secretKey = process.env.NEXT_PUBLIC_SECRET_ENC_KEY;
      if (!secretKey) {
        throw new Error(`Secret encryption key is not defined`);
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
          console.log('folderData:', data);
          setLocalStorageWithExpiry("folderData", JSON.stringify(data), expiry, clientIdPlain);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      if (localStorage.getItem("folderData") !== null) {
        let decoded = getLocalStorageWithExpiry("folderData", clientIdPlain);
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
  }, [clientIdPlain, expiry]);

  React.useEffect(() => {
    if (folderData.length !== 0 && clientIdPlain != null) {
      const getFolderDataAndSetState = async () => {
        const url = process.env.NEXT_PUBLIC_PM_API_HOST + "folders/" + folderData[0].id + "/tasks?access_token=" + process.env.NEXT_PUBLIC_ACCESS_TOKEN + "&fields=['description','customFields']";

        try {
          const data = await fetchData(url);
          setTaskData(data as TaskData[]);
          setLocalStorageWithExpiry("taskData", JSON.stringify(data), expiry, clientIdPlain);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      if (localStorage.getItem("taskData") !== null) {
        const decoded = getLocalStorageWithExpiry("taskData", clientIdPlain);
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
        } else if (field.id === 'IEACF6UMJUAFJQ2D') {
          setProjectPhase(field.value);
        }
      });
    }

  }, [folderData, expiry]);

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

        <div className="pt-4 w-full sm:w-8/12 m-auto">
          <Pizza progress={projectPhase ? projectPhase : ""} />
          <div id='tasks' className="flex flex-col sm:flex-row w-full gap-4 m-auto mt-2 justify-center">
            <div className="w-3/4 m-auto sm:m-0 sm:w-8/12">
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
                      accent={Constants.ACTIVE_COLOR}
                      primary={Constants.PRIMARY_COLOR}
                      border={Constants.ACTIVE_COLOR}
                      textColor="#fff"
                    />

                  ))
                ) : (
                  // TODO: change this so that it's a card instead
                  <p>No active tasks just yet.</p>
                )
              }
            </div >
            <div className="w-3/4 m-auto sm:m-0 sm:w-8/12">
              <p className="text-xl font-semibold text-gray-800 text-center mb-2 w-full">Completed Tasks:</p>
              {completedTasks && completedTasks.length > 0 ? (
                completedTasks.map((task: TaskData) => (
                  <Card
                    status={task.status}
                    key={task.id}
                    title={task.title}
                    id={task.id}
                    description={task.description}
                    accent={Constants.ACTIVE_COLOR}
                    primary={Constants.PRIMARY_COLOR}
                    border={Constants.COMPLETE_PRIMARY}
                    textColor="#fff"
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
