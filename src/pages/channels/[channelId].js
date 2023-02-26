import { getAllMessages } from "@/database";
import { useState } from "react";
import axios from "axios";

export default function Channel({ channelId, messages: initialMessages }) {

  const [userName, setUserName] = useState('')
  const [text, setText] = useState('')
  const [messages, setMessages] = useState(initialMessages)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit', userName, text)
    // Send to the database (POST)

    const result = await axios.post(`/api/channels/${channelId}/messages`, {
      userName, text
    })
    const newMessage = result.data
    console.log(newMessage)

    setMessages([...messages, newMessage])
  }

  console.log(messages)

  return (
    <div className='p-8'>
      <h1>Channel {channelId}</h1>
      <ul>
        {messages.map((message) => (
          <div key={message.id} class='bg-gray-50 p-4 mt-4 rounded-lg'>
            <p class='text-slate-900 font-bold'>{message.userName}</p>
            <div className='flex justify-between'>
            <p class='text-slate-900'>{message.text}</p>
            <p class='text-slate-500'>{message.created}</p>
            </div>
          </div>
        ))}
      </ul>
      <div className='mt-8 text-center'>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label for="userName" className='mr-4'>Username</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
          <label for="text" className='mr-4'>Message</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <div className='mt-4'>
            <button type="submit" class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Send</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // This is always server side
  // From the server, we can connect to the database
  const channelId = context.query.channelId
  const messages = await getAllMessages(channelId)
  return {
    props: {
      channelId,
      messages: JSON.parse(JSON.stringify(messages))
    }
  }
}