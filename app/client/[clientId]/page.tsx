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

// interface Task {
//   id: string;
//   status: string;
//   description: string;
//   title: string;
//   customFields: CustomField[];
// }

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
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchDataAndSetState();
    }
  }, [clientIdPlain]);

  React.useEffect(() => {
    if (folderData.length !== 0) {
      const getFolderDataAndSetState = async () => {
        const url = process.env.NEXT_PUBLIC_PM_API_HOST + "folders/" + folderData[0].id + "/tasks?access_token=" + process.env.NEXT_PUBLIC_ACCESS_TOKEN + "&fields=['description','customFields']";

        try {
          const data = await fetchData(url);
          setTaskData(data as TaskData[]);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      getFolderDataAndSetState();

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

        <div className="pt-4 w-6/12 m-auto">

          <div className="flex flex-row gap-4 m-auto justify-center">
            <div>
              <p className="text-xl font-semibold text-gray-800 text-center mb-2">Active Tasks :</p>
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
            <div>
              <p className="text-xl font-semibold text-gray-800 text-center mb-2">Completed Tasks:</p>
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
