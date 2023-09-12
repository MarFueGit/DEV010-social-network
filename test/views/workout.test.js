import workout from '../../src/views/workout';

global.console = { log: jest.fn() };
describe('workout', () => {
  it('renderiza el workout', () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const container = workout(navigateTo, user);

    expect(container).not.toBeUndefined();
  });
});
