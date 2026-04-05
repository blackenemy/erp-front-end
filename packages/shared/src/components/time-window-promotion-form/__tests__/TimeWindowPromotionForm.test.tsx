import { render, screen, fireEvent } from '@testing-library/react';
import TimeWindowPromotionForm from '../TimeWindowPromotionForm';
import type { TimeWindowPromotionFormSectionProps } from '../types';

describe('TimeWindowPromotionForm', () => {
  const defaultProps: TimeWindowPromotionFormSectionProps = {
    value: {
      startTime: '09:00',
      endTime: '18:00',
      discountPercent: 15,
    },
    onChange: jest.fn(),
  };

  it('renders form fields correctly', () => {
    render(<TimeWindowPromotionForm {...defaultProps} />);

    expect(screen.getByText('เวลาเริ่ม (HH:mm)')).toBeInTheDocument();
    expect(screen.getByText('เวลาสิ้นสุด (HH:mm)')).toBeInTheDocument();
    expect(screen.getByText('ส่วนลดราคา (%)')).toBeInTheDocument();
  });

  it('displays current values', () => {
    render(<TimeWindowPromotionForm {...defaultProps} />);

    const startTimeInput = screen.getByLabelText('เวลาเริ่ม (HH:mm)');
    const endTimeInput = screen.getByLabelText('เวลาสิ้นสุด (HH:mm)');
    const discountInput = screen.getByLabelText('ส่วนลดราคา (%)');

    expect(startTimeInput).toHaveValue('09:00');
    expect(endTimeInput).toHaveValue('18:00');
    expect(discountInput).toHaveValue(15);
  });

  it('calls onChange when startTime changes', () => {
    render(<TimeWindowPromotionForm {...defaultProps} />);

    const startTimeInput = screen.getByLabelText('เวลาเริ่ม (HH:mm)');
    fireEvent.change(startTimeInput, { target: { value: '10:00' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      startTime: '10:00',
      endTime: '18:00',
      discountPercent: 15,
    });
  });

  it('calls onChange when endTime changes', () => {
    render(<TimeWindowPromotionForm {...defaultProps} />);

    const endTimeInput = screen.getByLabelText('เวลาสิ้นสุด (HH:mm)');
    fireEvent.change(endTimeInput, { target: { value: '20:00' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      startTime: '09:00',
      endTime: '20:00',
      discountPercent: 15,
    });
  });

  it('calls onChange when discountPercent changes', () => {
    render(<TimeWindowPromotionForm {...defaultProps} />);

    const discountInput = screen.getByLabelText('ส่วนลดราคา (%)');
    fireEvent.change(discountInput, { target: { value: '20' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      startTime: '09:00',
      endTime: '18:00',
      discountPercent: 20,
    });
  });
});
