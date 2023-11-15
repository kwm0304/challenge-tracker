const Gif = () => {
  return (
    <div className='bg-slate-800 min-h-screen grid grid rows-2 items-center text-amber-300 text-center'>
      <div className="font-bold text-2xl pt-12">
      <div>All done for today!</div>
      <div>See you tomorrow</div>
      </div>
              <iframe src="https://giphy.com/embed/l0ErFafpUCQTQFMSk" width="480" height="260" className="giphy-embed" 
              ></iframe><p><a href="https://giphy.com/gifs/filmeditor-high-five-sacha-baron-cohen-l0ErFafpUCQTQFMSk"></a></p>
    </div>
  )
}

export default Gif