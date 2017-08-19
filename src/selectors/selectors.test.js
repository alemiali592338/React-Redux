import expect from 'expect';
import {formatAuthors} from './selectors';

describe('Author Selectors', () => {
  describe('Authors formatted for dropdown', () => {
    it('Should return formatted data suitable to be used in drowdown', () => {
      const authors = [
        {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
        {id: 'scott-allen', firstName: 'Scott', lastName: 'Allen'}
      ];

      const expected = [
        {value: 'cory-house', text: 'Cory House'},
        {value: 'scott-allen', text: 'Scott Allen'}
      ];

      expect(formatAuthors(authors)).toEqual(expected);
    });
  });
});
