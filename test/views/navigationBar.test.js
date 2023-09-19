import { fireEvent, getByText } from '@testing-library/dom';
import navigationBar from '../../src/views/navigationBar';

describe('Navigation bar', () => {
  it('Renderiza navigation bar', () => {
    const container = navigationBar();
    expect(container).not.toBeUndefined();
  });
  it('Click a feed', () => {
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const button = getByText(container, 'Feed');
    fireEvent(button, new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
  it('Click a recipes', () => {
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const button = getByText(container, 'Recipes');
    fireEvent(button, new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
  it('Click a workout', () => {
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const button = getByText(container, 'Workout');
    fireEvent(button, new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
  it('Click a profile', () => {
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const button = getByText(container, 'Profile');
    fireEvent(button, new MouseEvent('click', {}));
    expect(container).not.toBeUndefined();
  });
  it('Verifica cambios de estilo en ruta Feed', () => {
    window.history.pushState({}, 'Test page', '/feed'); // simula cambio de ruta de testpage a feed
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const recipesButton = getByText(container, 'Recipes');
    const workoutButton = getByText(container, 'Workout');
    const profileButton = getByText(container, 'Profile');
    expect(container).not.toBeUndefined();
    expect(recipesButton.style.color).toBe('black');
    expect(workoutButton.style.color).toBe('black');
    expect(profileButton.style.color).toBe('black');
  });
  it('Verifica cambios de estilo en ruta Recipes', () => {
    window.history.pushState({}, 'Test page', '/recipes');
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const feedButton = getByText(container, 'Feed');
    const workoutButton = getByText(container, 'Workout');
    const profileButton = getByText(container, 'Profile');
    expect(container).not.toBeUndefined();
    expect(feedButton.style.color).toBe('black');
    expect(workoutButton.style.color).toBe('black');
    expect(profileButton.style.color).toBe('black');
  });
  it('Verifica cambios de estilo en ruta Workout', () => {
    window.history.pushState({}, 'Test page', '/workout');
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const feedButton = getByText(container, 'Feed');
    const recipesButton = getByText(container, 'Recipes');
    const profileButton = getByText(container, 'Profile');
    expect(container).not.toBeUndefined();
    expect(feedButton.style.color).toBe('black');
    expect(recipesButton.style.color).toBe('black');
    expect(profileButton.style.color).toBe('black');
  });
  it('Verifica cambios de estilo en ruta Profile', () => {
    window.history.pushState({}, 'Test page', '/profile');
    const navigateTo = jest.fn();
    const container = navigationBar(navigateTo);
    const feedButton = getByText(container, 'Feed');
    const recipesButton = getByText(container, 'Recipes');
    const workoutButton = getByText(container, 'Workout');
    expect(container).not.toBeUndefined();
    expect(feedButton.style.color).toBe('black');
    expect(recipesButton.style.color).toBe('black');
    expect(workoutButton.style.color).toBe('black');
  });
});
