import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

/**
 * Wrapper hook to access the global audio player.
 */
export function useAudioPlayer() {
  // We re-use the PlayerContext directly so that consumers don't need to
  // import from two different places.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useContext(PlayerContext)!;
}
