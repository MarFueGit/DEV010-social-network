import recipes from '../../src/views/recipes';

global.console = { log: jest.fn() }; // testeo del console.log
describe('recipes', () => {
  it('Renderiza recipes', () => {
    const navigateTo = jest.fn();
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const container = recipes(navigateTo, user);

    expect(container).not.toBeUndefined();
  });
});
