import filter from '../../src/views/filter';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  getFirestore: jest.fn(),
  onSnapshot: jest.fn((query, callback) => {
    const querySnapshot = [
      {
        data: () => ({
          Content: 'Este es un ejemplo',
          Date: {
            seconds: 1694173047,
            nanoseconds: 712000000,
            toDate: () => new Date(),
          },
          Type: 'Recipe',
          UserID: '1',
          UserName: 'maricela fuentes',
          Likes: ['1'],
        }),
      },
    ];
    return callback(querySnapshot); // Llame a la devolución de llamada con querySnapshot
  }),
  where: jest.fn(),
}));

describe('filter', () => {
  it('renderiza a filter con la ruta recipes ', () => {
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const route = '/recipes';
    const container = filter(user, route);
    expect(container).not.toBeUndefined();
  });

  it('renderiza a filter con la ruta workout ', () => {
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const route = '/workout';
    const container = filter(user, route);
    expect(container).not.toBeUndefined();
  });
  it('renderiza a filter con la ruta profile ', () => {
    const user = {
      displayName: 'maricela fuentes',
      email: 'maricelafuentes100@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const route = '/profile';
    const container = filter(user, route);
    expect(container).not.toBeUndefined();
  });
});
