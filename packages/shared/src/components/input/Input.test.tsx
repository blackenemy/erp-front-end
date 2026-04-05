import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    render(<Input helperText="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('displays error message instead of helper text when both are provided', () => {
    render(<Input error="Error" helperText="Helper" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Input variant="outlined" />);
    const inputWrapper = container.querySelector('.inputWrapper');
    expect(inputWrapper).toHaveClass('outlined');
  });

  it('applies filled variant class', () => {
    const { container } = render(<Input variant="filled" />);
    const inputWrapper = container.querySelector('.inputWrapper');
    expect(inputWrapper).toHaveClass('filled');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<Input fullWidth />);
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toHaveClass('fullWidth');
  });

  it('renders left icon when provided', () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided', () => {
    render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('generates id when not provided', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('id');
    expect(input?.id).toMatch(/^input-[a-z0-9]+$/);
  });

  it('uses provided id', () => {
    const { container } = render(<Input id="custom-id" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('associates label with input via htmlFor and id', () => {
    const { container } = render(<Input id="test-id" label="Test Label" />);
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(label).toHaveAttribute('for', 'test-id');
    expect(input).toHaveAttribute('id', 'test-id');
  });

  it('applies custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('passes through other input props', () => {
    const { container } = render(<Input placeholder="Enter value" type="email" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Enter value');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    const { container } = render(<Input onChange={handleChange} />);
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
