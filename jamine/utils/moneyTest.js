import { formartCurrency } from '../../scripts/utils/money.js';
// test suit
describe('test suit: formartCurrency', () => {
  it('convert cents to dollar', () => {
    expect(formartCurrency(2095)).toEqual('20.95');
  });

  it('works with 0 ', () => {
    expect(formartCurrency(0)).toEqual('0.00');
  });
});
