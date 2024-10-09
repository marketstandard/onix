// Assuming your function is defined in a file named `phoneUtils.ts`
import { toSafePhone } from '../toSafePhone';

describe('toSafePhone', () => {
  it('should remove all non-digit characters except the leading +', () => {
    expect(toSafePhone('+1 (234) 567-890')).toBe('+1234567890');
  });

  it('should correctly handle numbers without a leading +', () => {
    expect(toSafePhone('1-800-123-4567')).toBe('18001234567');
  });

  it('should return an empty string if no digits are present', () => {
    expect(toSafePhone('No Digits Here!')).toBe('');
  });

  it('should handle strings that only contain digits', () => {
    expect(toSafePhone('1234567890')).toBe('1234567890');
  });

  it('should remove spaces, parentheses, and hyphens', () => {
    expect(toSafePhone('(123) 456-7890')).toBe('1234567890');
  });

  it('should not alter a correctly formatted number', () => {
    const correctFormat = '+1234567890';
    expect(toSafePhone(correctFormat)).toBe(correctFormat);
  });

  it('should handle string with multiple leading + signs by removing extras', () => {
    expect(toSafePhone('++1234567890')).toBe('+1234567890');
  });

  it('should remove illegal characters from a phone number with international format', () => {
    expect(toSafePhone('+44-20-1234-5678')).toBe('+442012345678');
  });
});
