import { useState, useEffect } from 'react'
import axios from 'axios'

import Card from "@/components/Card";

import { getAllChannels } from "@/database";

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}

async function createNewChannel(name) {
  const response = await axios.post("/api/channels", { name });
  return response.data
}

export default function Channels({ channels }) {
  const [channelName, setChannelName] = useState("");

  // useEffect(() => {
  //     // Anything in useEffect will definitely run on the client
  //     // in the browser
  //     wait(5).then(() => axios.get("/api/channels")
  //     .then((response) => {
  //         setChannels(response.data)
  //     }))
  // }, [])
  // Get request to /api/channels
  // useState
  // useEffect

  return (
    <>
    <h1 className='text-center text-4xl'>Select a channel</h1>
      <input type="text" placeholder="Channel name" value={channelName} onChange={(e) => { setChannelName(e.target.value)}}/>
      <button onClick={() => { createNewChannel(channelName) }}>Create channel</button>
      <div className='flex flex-wrap gap-4 place-content-center'>
        {channels.map((channel) => (
          <div key={channel.id}>
          <Card name={channel.name} created={channel.created} id={channel.id}/>
          </div>
        ))}
    </div>
    </>
  )
}

export async function getServerSideProps() {

  // runs on the server
  const channels = await getAllChannels();

  return {
    props: {
      channels: JSON.parse(JSON.stringify(channels))
    }
  }

}