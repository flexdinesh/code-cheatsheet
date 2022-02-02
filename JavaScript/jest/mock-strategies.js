/** Mock a lib method  */
import debounce from 'lodash.debounce';
jest.mock('lodash.debounce', () => jest.fn((fn) => fn));
