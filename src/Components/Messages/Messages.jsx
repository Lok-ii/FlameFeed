import BigMessage from '../../assets/icons/BigMessage';

const Messages = () => {
  return (
    <div className="w-[85%] h-[100vh] flex flex-col items-center justify-center gap-4">
      <BigMessage />
      <p>Your messages</p>
      <p>Send private photos and messages to a friend or group.</p>
      <button className='bg-bluePrimary px-4 py-1 rounded-lg text-[0.875rem] font-medium'>Send Message</button>
    </div>
  )
}

export default Messages;
