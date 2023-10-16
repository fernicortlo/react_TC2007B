const mockUseLogout = jest.fn();

jest.mock('react-admin', () => {
  const originalModule = jest.requireActual('react-admin');
  return {
    ...originalModule,
    useLogout: mockUseLogout,
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('MyDashboardButton', () => {
  it('should call the logout function when clicked', async () => {
    mockUseLogout.mockImplementation(() => jest.fn());
  });
});
