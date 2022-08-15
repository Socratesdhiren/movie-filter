import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

test('renders the card of the movie', () => {
  render(<MovieCard />);
  // screen.debug();
//   expect(linkElement).toBeInTheDocument();
});