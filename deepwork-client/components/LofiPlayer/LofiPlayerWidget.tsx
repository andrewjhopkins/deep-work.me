import { memo, useState } from "react";
import { BsPlayCircleFill, BsPauseCircleFill, BsYoutube } from "react-icons/bs";
import { IconContext } from "react-icons";
import YouTube from "react-youtube";

const LofiPlayerWidget = memo((props) => {
    const [player, setPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);

    function _onReady(event) {
        setPlayer(event.target);
        event.target.pauseVideo();
    }

    function togglePlay() {
        if(player) {
            playing ? player.pauseVideo() : player.playVideo();
            setPlaying(!playing)
        }
    }

    function pause() {
        if (player) {
            player.pauseVideo();
            setPlaying(false);
        }
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
        <div className="m-10 h-60 w-96 grid grid-rows-5 border-2 border-gray-900 bg-gray-800 bg-opacity-90 rounded-lg">
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



        </div>
    )
});

export default LofiPlayerWidget;