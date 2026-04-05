import { render, screen, fireEvent } from '@testing-library/react';
import RemoteAreaSurchargeForm from '../RemoteAreaSurchargeForm';
import type { RemoteAreaSurchargeFormSectionProps } from '../types';

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
      screen.getByText('รหัสไปรษณีย์พื้นที่ห่างไกล (คั่นด้วยลูก)')
    ).toBeInTheDocument();
    expect(screen.getByText('ค่าบวกเพิ่ม (฿)')).toBeInTheDocument();
  });

  it('displays current values', () => {
    render(<RemoteAreaSurchargeForm {...defaultProps} />);

    const zipInput = screen.getByLabelText(
      'รหัสไปรษณีย์พื้นที่ห่างไกล (คั่นด้วยลูก)'
    );
    const surchargeInput = screen.getByLabelText('ค่าบวกเพิ่ม (฿)');

    expect(zipInput).toHaveValue('95, 96, 63');
    expect(surchargeInput).toHaveValue(30);
  });

  it('calls onChange when remoteZipPrefixes changes', () => {
    render(<RemoteAreaSurchargeForm {...defaultProps} />);

    const zipInput = screen.getByLabelText(
      'รหัสไปรษณีย์พื้นที่ห่างไกล (คั่นด้วยลูก)'
    );
    fireEvent.change(zipInput, { target: { value: '95, 96, 63, 64' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      remoteZipPrefixes: ['95', '96', '63', '64'],
      surchargeFlat: 30,
    });
  });

  it('trims and filters empty values from zip prefixes', () => {
    render(<RemoteAreaSurchargeForm {...defaultProps} />);

    const zipInput = screen.getByLabelText(
      'รหัสไปรษณีย์พื้นที่ห่างไกล (คั่นด้วยลูก)'
    );
    fireEvent.change(zipInput, { target: { value: '95, , 96, , ' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      remoteZipPrefixes: ['95', '96'],
      surchargeFlat: 30,
    });
  });

  it('calls onChange when surchargeFlat changes', () => {
    render(<RemoteAreaSurchargeForm {...defaultProps} />);

    const surchargeInput = screen.getByLabelText('ค่าบวกเพิ่ม (฿)');
    fireEvent.change(surchargeInput, { target: { value: '50' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      remoteZipPrefixes: ['95', '96', '63'],
      surchargeFlat: 50,
    });
  });
});
