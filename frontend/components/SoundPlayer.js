// components/SoundPlayer.js

const SoundPlayer = ({ src }) => {
  return (
    <audio autoPlay>
      <source src={src} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default SoundPlayer;
