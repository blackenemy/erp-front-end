import { render, screen, fireEvent } from '@testing-library/react';
import FormWeightTier from './FormWeightTier';

const mockTiers = [
  { minKg: 0, maxKg: 5, pricePerKg: 50 },
  { minKg: 6, maxKg: 10, pricePerKg: 45 },
  { minKg: 11, maxKg: 20, pricePerKg: 40 },
];

describe('FormWeightTier', () => {
  it('renders label', () => {
    render(<FormWeightTier tiers={[]} onChange={jest.fn()} />);
    expect(screen.getByText('ช่วงราคาตามน้ำหนัก (Tiers)')).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<FormWeightTier tiers={[]} onChange={jest.fn()} label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('renders add button when no tiers', () => {
    render(<FormWeightTier tiers={[]} onChange={jest.fn()} />);
    expect(screen.getByText('เพิ่มช่วง')).toBeInTheDocument();
  });

  it('renders tier rows when tiers are provided', () => {
    render(<FormWeightTier tiers={mockTiers} onChange={jest.fn()} />);
    expect(screen.getByText('น้ำหนักขั้นต่ำ (kg)')).toBeInTheDocument();
    expect(screen.getByText('น้ำหนักสูงสุด (kg)')).toBeInTheDocument();
    expect(screen.getByText('ราคาต่อกิโลกรัม (฿)')).toBeInTheDocument();
  });

  it('renders correct number of tier rows', () => {
    const { container } = render(<FormWeightTier tiers={mockTiers} onChange={jest.fn()} />);
    const tierRows = container.querySelectorAll('.tierRow');
    expect(tierRows).toHaveLength(3);
  });

  it('displays tier values correctly', () => {
    render(<FormWeightTier tiers={mockTiers} onChange={jest.fn()} />);
    const inputs = screen.getAllByRole('spinbutton');
    
    expect(inputs[0]).toHaveValue(0);
    expect(inputs[1]).toHaveValue(5);
    expect(inputs[2]).toHaveValue(50);
  });

  it('calls onChange when add tier button is clicked', () => {
    const handleChange = jest.fn();
    render(<FormWeightTier tiers={mockTiers} onChange={handleChange} />);
    
    const addButton = screen.getAllByText('เพิ่มช่วง')[0];
    fireEvent.click(addButton);
    
    expect(handleChange).toHaveBeenCalledWith([...mockTiers, { minKg: 0, maxKg: 0, pricePerKg: 0 }]);
  });

  it('calls onChange when remove tier button is clicked', () => {
    const handleChange = jest.fn();
    render(<FormWeightTier tiers={mockTiers} onChange={handleChange} />);
    
    const deleteButtons = screen.getAllByText('ลบ');
    fireEvent.click(deleteButtons[0]);
    
    expect(handleChange).toHaveBeenCalledWith([mockTiers[1], mockTiers[2]]);
  });

  it('calls onChange when tier value is changed', () => {
    const handleChange = jest.fn();
    render(<FormWeightTier tiers={mockTiers} onChange={handleChange} />);
    
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '10' } });
    
    expect(handleChange).toHaveBeenCalledWith([
      { minKg: 10, maxKg: 5, pricePerKg: 50 },
      mockTiers[1],
      mockTiers[2],
    ]);
  });

  it('disables inputs when disabled prop is true', () => {
    render(<FormWeightTier tiers={mockTiers} onChange={jest.fn()} disabled />);
    
    const inputs = screen.getAllByRole('spinbutton');
    const deleteButtons = screen.getAllByText('ลบ');
    const addButtons = screen.getAllByText('เพิ่มช่วง');
    
    inputs.forEach(input => expect(input).toBeDisabled());
    deleteButtons.forEach(button => expect(button).toBeDisabled());
    addButtons.forEach(button => expect(button).toBeDisabled());
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormWeightTier tiers={mockTiers} onChange={jest.fn()} className="custom-class" />
    );
    const root = container.querySelector('.root');
    expect(root).toHaveClass('custom-class');
  });

  it('renders with id prop', () => {
    const { container } = render(
      <FormWeightTier tiers={mockTiers} onChange={jest.fn()} id="test-id" />
    );
    const root = container.querySelector('.root');
    expect(root).toHaveAttribute('id', 'test-id');
  });

  it('renders add button at the bottom when tiers exist', () => {
    render(<FormWeightTier tiers={mockTiers} onChange={jest.fn()} />);
    const addButtons = screen.getAllByText('เพิ่มช่วง');
    expect(addButtons).toHaveLength(2);
  });

  it('has correct field labels', () => {
    render(<FormWeightTier tiers={mockTiers} onChange={jest.fn()} />);
    
    const minLabels = screen.getAllByText('น้ำหนักขั้นต่ำ (kg)');
    const maxLabels = screen.getAllByText('น้ำหนักสูงสุด (kg)');
    const priceLabels = screen.getAllByText('ราคาต่อกิโลกรัม (฿)');
    
    expect(minLabels).toHaveLength(3);
    expect(maxLabels).toHaveLength(3);
    expect(priceLabels).toHaveLength(3);
  });

  it('handles empty string input correctly', () => {
    const handleChange = jest.fn();
    render(<FormWeightTier tiers={mockTiers} onChange={handleChange} />);
    
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '' } });
    
    expect(handleChange).toHaveBeenCalledWith([
      { minKg: NaN, maxKg: 5, pricePerKg: 50 },
      mockTiers[1],
      mockTiers[2],
    ]);
  });

  it('applies button styles correctly', () => {
    const { container } = render(<FormWeightTier tiers={mockTiers} onChange={jest.fn()} />);
    
    const addButtons = screen.getAllByText('เพิ่มช่วง');
    const deleteButtons = screen.getAllByText('ลบ');
    
    addButtons.forEach(button => {
      expect(button.parentElement).toHaveClass('buttonSecondary');
    });
    
    deleteButtons.forEach(button => {
      expect(button.parentElement).toHaveClass('buttonDanger');
    });
  });
});
