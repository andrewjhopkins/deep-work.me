import { memo, useState } from "react";
import { BsPlayCircleFill, BsPauseCircleFill, BsYoutube } from "react-icons/bs";
import { IconContext } from "react-icons";
import YouTube from "react-youtube";

const LofiPlayerWidget = memo((props) => {
    const [player, setPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);

    const [playerVolume, setPlayerVolume] = useState(50);
    const [playerTitle, setPlayerTitle] = useState("");

    const onReady = (event) => {
        setPlayer(event.target);
        event.target.pauseVideo();
        event.target.setVolume(playerVolume);
        setPlayerTitle(event.target.videoTitle);
    }

    const togglePlay = () => {
        if(player) {
            playing ? player.pauseVideo() : player.playVideo();
            setPlaying(!playing)
        }
    }

    const handleVolumeChange = (event) => {
        setPlayerVolume(event.target.value);
        player.setVolume(playerVolume);
    }

    const onEnd = () => {
        //TODO
    }

    const options = {
        height: '0',
        width: '0',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };

    return (
        <div className="h-20 w-96 grid grid-rows-6 border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">
            <div className="handle row-span-1 cursor-move">
            </div>
            <div className="handle row-span-2 grid grid-cols-7 cursor-move">
                <div className="ml-3 col-span-6 text-white text-sm">
                    <span>{playerTitle}</span>
                </div>
                <div className="col-span-1 flex justify-center">
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <a onClick={togglePlay} href="https://www.youtube.com/watch?v=jfKfPfyJRdk" target="_blank" rel="noreferrer"><BsYoutube /></a>
                    </IconContext.Provider>
                </div>
           </div>

            <div className="row-span-3 grid grid-cols-12">
                <div className="ml-3 col-span-1 flex items-center cursor-pointer">
                    <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        {playing ? <BsPauseCircleFill onClick={togglePlay}/> : <BsPlayCircleFill onClick={togglePlay}/>}
                    </IconContext.Provider>
                </div>
                <div className="ml-3 mr-3 col-span-11 flex items-center">
                    <input onChange={handleVolumeChange} id="default-range" type="range" value={playerVolume} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
                </div>
            </div>

            <YouTube id="player" videoId="jfKfPfyJRdk" opts={options} onReady={onReady} onEnd={onEnd}/>
        </div>
    )
});

LofiPlayerWidget.displayName = "LofiPlayerWidget";

export default LofiPlayerWidget;