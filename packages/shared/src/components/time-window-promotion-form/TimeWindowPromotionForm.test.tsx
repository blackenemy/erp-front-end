import { render, screen, fireEvent } from '@testing-library/react';
import TimeWindowPromotionForm from './TimeWindowPromotionForm';
import type { TimeWindowPromotionFormSectionProps } from './types';

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
    const { container } = render(<TimeWindowPromotionForm {...defaultProps} />);

    const inputs = container.querySelectorAll('input');
    expect(inputs[0]).toHaveValue('09:00');
    expect(inputs[1]).toHaveValue('18:00');
    expect(inputs[2]).toHaveValue(15);
  });

  it('calls onChange when startTime changes', () => {
    const { container } = render(<TimeWindowPromotionForm {...defaultProps} />);

    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: '10:00' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      startTime: '10:00',
      endTime: '18:00',
      discountPercent: 15,
    });
  });

  it('calls onChange when endTime changes', () => {
    const { container } = render(<TimeWindowPromotionForm {...defaultProps} />);

    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[1], { target: { value: '20:00' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      startTime: '09:00',
      endTime: '20:00',
      discountPercent: 15,
    });
  });

  it('calls onChange when discountPercent changes', () => {
    const { container } = render(<TimeWindowPromotionForm {...defaultProps} />);

    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[2], { target: { value: '20' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      startTime: '09:00',
      endTime: '18:00',
      discountPercent: 20,
    });
  });
});
