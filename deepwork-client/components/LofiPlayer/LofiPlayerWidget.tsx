import { memo, useState } from "react";
import { BsPlayCircleFill, BsPauseCircleFill, BsYoutube } from "react-icons/bs";
import { IconContext } from "react-icons";
import YouTube from "react-youtube";

const LofiPlayerWidget = memo((props) => {
    const [player, setPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);

    const [playerVolume, setPlayerVolume] = useState(50);

    function _onReady(event) {
        setPlayer(event.target);
        event.target.pauseVideo();
        event.target.setVolume(playerVolume);
    }

    function togglePlay() {
        if(player) {
            playing ? player.pauseVideo() : player.playVideo();
            setPlaying(!playing)
        }
    }

    function handleVolumeChange(event) {
        console.log(event.target.value);
        setPlayerVolume(event.target.value);
        player.setVolume(playerVolume);
    }

    const options = {
        height: '0',
        width: '0',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    return (
        <div className="m-10 h-60 w-96 grid grid-rows-6 border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">
            <div className="handle border-2 row-span-1"></div>
            <YouTube id="player" videoId="jfKfPfyJRdk" opts={options} onReady={_onReady} />
            <IconContext.Provider
                value={{ color: 'white', size: '20px' }}
            >
                <div>
                    {playing ? <BsPauseCircleFill onClick={togglePlay}/> : <BsPlayCircleFill onClick={togglePlay}/>}
                </div>
            </IconContext.Provider>

            <IconContext.Provider
                value={{ color: 'red', size: '20px' }}
            >
                <BsYoutube />
            </IconContext.Provider>
            <div className="w-48">
                <input onChange={handleVolumeChange} id="default-range" type="range" value={playerVolume} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
            </div>
        </div>
    )
});

export default LofiPlayerWidget;