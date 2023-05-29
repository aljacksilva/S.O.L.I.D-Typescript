describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 10;

    expect(number).toBe(10);
    expect(number).toEqual(10);
    expect(number).toBeTruthy();
    expect(number).not.toBeFalsy();
    expect(number).toBeGreaterThan(9);
    expect(number).toBeGreaterThanOrEqual(10);
    expect(number).toBeLessThan(11);
    expect(number).toBeLessThanOrEqual(10);
    expect(number).toBeCloseTo(9.997);
    expect(number).not.toBeNull();
    expect(number).toHaveProperty('toString');
  });
});

describe('Objects', () => {
  it('should test jest assertions', () => {
    const person = { name: 'Jack', age: 30 };
    const anotherPerson = { ...person };

    expect(person).toEqual(anotherPerson);
    expect(person).toHaveProperty('age');
    expect(person).not.toHaveProperty('lastname');
  });
});
