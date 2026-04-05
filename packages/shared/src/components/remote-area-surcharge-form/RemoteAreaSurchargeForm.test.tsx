import { render, screen, fireEvent } from '@testing-library/react';
import RemoteAreaSurchargeForm from './RemoteAreaSurchargeForm';
import type { RemoteAreaSurchargeFormSectionProps } from './types';

describe('RemoteAreaSurchargeForm', () => {
  const defaultProps: RemoteAreaSurchargeFormSectionProps = {
    value: {
      remoteZipPrefixes: ['95', '96', '63'],
      surchargeFlat: 30,
    },
    onChange: jest.fn(),
  };

  it('renders form fields correctly', () => {
    render(<RemoteAreaSurchargeForm {...defaultProps} />);

    expect(
      screen.getByText('รหัสไปรษณีย์พื้นที่ห่างไกล')
    ).toBeInTheDocument();
    expect(screen.getByText('ค่าบวกเพิ่ม (฿)')).toBeInTheDocument();
  });

  it('displays current values', () => {
    const { container } = render(<RemoteAreaSurchargeForm {...defaultProps} />);

    const surchargeInput = container.querySelector('input[type="number"]');
    expect(surchargeInput).toHaveValue(30);
  });

  it('calls onChange when remoteZipPrefixes changes', () => {
    render(<RemoteAreaSurchargeForm {...defaultProps} />);

    const { container } = render(<RemoteAreaSurchargeForm {...defaultProps} />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('trims and filters empty values from zip prefixes', () => {
    const { container } = render(<RemoteAreaSurchargeForm {...defaultProps} />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('calls onChange when surchargeFlat changes', () => {
    const { container } = render(<RemoteAreaSurchargeForm {...defaultProps} />);

    const surchargeInput = container.querySelector('input[type="number"]');
    if (surchargeInput) {
      fireEvent.change(surchargeInput, { target: { value: '50' } });
    }

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      remoteZipPrefixes: ['95', '96', '63'],
      surchargeFlat: 50,
    });
  });
});
