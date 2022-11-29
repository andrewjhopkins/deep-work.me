import { memo } from "react";
import YouTube from "react-youtube";

const LofiPlayerWidget = memo((props) => {
    let player;

    function _onReady(event) {
        player = event.target;
        event.target.pauseVideo();
    }

    function play() {
        player.playVideo();
    }

    function pause() {
        player.pauseVideo();
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
            <div onClick={play}>Play</div>
            <div onClick={pause}>Pause</div>
        </div>
    )
});

export default LofiPlayerWidget;