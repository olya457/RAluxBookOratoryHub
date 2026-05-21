import {useWindowDimensions} from 'react-native';

export function useCompactScreen(): boolean {
  const {height} = useWindowDimensions();
  return height <= 700;
}
