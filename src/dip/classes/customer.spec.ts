import { IndividualCustomer, EnterpriseCustomer } from './customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks());

describe('IndividualCustomer', () => {
  it('should have firstName, lastName and cpf', () => {
    const sut = createIndividualCustomer('Jack', 'Johassen', '222.222');

    expect(sut).toHaveProperty('firstName', 'Jack');
    expect(sut).toHaveProperty('lastName', 'Johassen');
    expect(sut).toHaveProperty('cpf', '222.222');
  });

  it('should have methods to get name and idn for individual customers', () => {
    const sut = createIndividualCustomer('Jack', 'Johassen', '222.222');

    expect(sut.getName()).toBe('Jack Johassen');
    expect(sut.getIDN()).toBe('222.222');
  });
});

describe('EnterpriseCustomer', () => {
  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustomer('Nike', '222');

    expect(sut).toHaveProperty('name', 'Nike');
    expect(sut).toHaveProperty('cnpj', '222');
  });

  it('should have methods to get name and idn for enterprise customers', () => {
    const sut = createEnterpriseCustomer('Nike', '222');

    expect(sut.getName()).toBe('Nike');
    expect(sut.getIDN()).toBe('222');
  });
});
