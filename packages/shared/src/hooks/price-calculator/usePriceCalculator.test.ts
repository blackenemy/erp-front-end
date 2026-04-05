import { renderHook, act } from '@testing-library/react';
import usePriceCalculator from './use-price-calculator';

jest.mock('../api');
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockUseCalculatePrice = require('../api').useCalculatePrice;
const { toast } = require('sonner');

describe('usePriceCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCalculatePrice.mockReturnValue({
      loading: false,
      mutate: jest.fn().mockResolvedValue({ total: 500, currency: 'THB' }),
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => usePriceCalculator());
    
    expect(result.current.quoteRequest).toEqual({
      weightKg: 0,
      originZip: '',
      destinationZip: '',
    });
    expect(result.current.quoteResult).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('updates quote request when setQuoteRequest is called', () => {
    const { result } = renderHook(() => usePriceCalculator());
    
    act(() => {
      result.current.setQuoteRequest({
        weightKg: 10,
        originZip: '12345',
        destinationZip: '67890',
      });
    });
    
    expect(result.current.quoteRequest).toEqual({
      weightKg: 10,
      originZip: '12345',
      destinationZip: '67890',
    });
  });

  it('calculates price when handleCalculatePrice is called', async () => {
    const mockResult = { total: 500, currency: 'THB' };
    const mockMutate = jest.fn().mockResolvedValue(mockResult);
    mockUseCalculatePrice.mockReturnValue({
      loading: false,
      mutate: mockMutate,
    });
    const { result } = renderHook(() => usePriceCalculator());
    
    act(() => {
      result.current.setQuoteRequest({
        weightKg: 10,
        originZip: '12345',
        destinationZip: '67890',
      });
    });
    
    await act(async () => {
      await result.current.handleCalculatePrice();
    });
    
    expect(mockMutate).toHaveBeenCalledWith({
      weightKg: 10,
      originZip: '12345',
      destinationZip: '67890',
    });
    expect(result.current.quoteResult).toEqual(mockResult);
    expect(toast.success).toHaveBeenCalledWith('คำนวณราคาสำเร็จ');
  });

  it('shows error when calculation fails', async () => {
    const mockError = new Error('Failed to calculate');
    const mockMutate = jest.fn().mockRejectedValue(mockError);
    mockUseCalculatePrice.mockReturnValue({
      loading: false,
      mutate: mockMutate,
    });
    const { result } = renderHook(() => usePriceCalculator());
    
    act(() => {
      result.current.setQuoteRequest({
        weightKg: 10,
        originZip: '12345',
        destinationZip: '67890',
      });
    });
    
    await act(async () => {
      await result.current.handleCalculatePrice();
    });
    
    expect(toast.error).toHaveBeenCalledWith('คำนวณราคาไม่สำเร็จ');
  });

  it('returns loading state from calculatePrice hook', () => {
    mockUseCalculatePrice.mockReturnValue({
      loading: true,
      mutate: jest.fn(),
    });
    const { result } = renderHook(() => usePriceCalculator());
    
    expect(result.current.loading).toBe(true);
  });

  it('updates quote result after successful calculation', async () => {
    const mockResult1 = { total: 500, currency: 'THB' };
    const mockResult2 = { total: 600, currency: 'THB' };
    const mockMutate = jest.fn()
      .mockResolvedValueOnce(mockResult1)
      .mockResolvedValueOnce(mockResult2);
    mockUseCalculatePrice.mockReturnValue({
      loading: false,
      mutate: mockMutate,
    });
    const { result } = renderHook(() => usePriceCalculator());
    
    await act(async () => {
      await result.current.handleCalculatePrice();
    });
    expect(result.current.quoteResult).toEqual(mockResult1);
    
    act(() => {
      result.current.setQuoteRequest({
        weightKg: 20,
        originZip: '11111',
        destinationZip: '22222',
      });
    });
    
    await act(async () => {
      await result.current.handleCalculatePrice();
    });
    expect(result.current.quoteResult).toEqual(mockResult2);
  });

  it('maintains quote result between calculations', async () => {
    const mockResult = { total: 500, currency: 'THB' };
    const mockMutate = jest.fn().mockResolvedValue(mockResult);
    mockUseCalculatePrice.mockReturnValue({
      loading: false,
      mutate: mockMutate,
    });
    const { result } = renderHook(() => usePriceCalculator());
    
    await act(async () => {
      await result.current.handleCalculatePrice();
    });
    expect(result.current.quoteResult).toEqual(mockResult);
    
    act(() => {
      result.current.setQuoteRequest({
        weightKg: 15,
        originZip: '33333',
        destinationZip: '44444',
      });
    });
    expect(result.current.quoteResult).toEqual(mockResult);
  });
});
