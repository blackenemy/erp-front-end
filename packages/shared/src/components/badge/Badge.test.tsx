import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('default');
    expect(badge).toHaveClass('md');
  });

  it('applies variant class', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('success');
  });

  it('applies all variant classes', () => {
    const { container: primaryContainer } = render(<Badge variant="primary">Primary</Badge>);
    const { container: warningContainer } = render(<Badge variant="warning">Warning</Badge>);
    const { container: dangerContainer } = render(<Badge variant="danger">Danger</Badge>);
    const { container: infoContainer } = render(<Badge variant="info">Info</Badge>);

    expect(primaryContainer.querySelector('.badge')).toHaveClass('primary');
    expect(warningContainer.querySelector('.badge')).toHaveClass('warning');
    expect(dangerContainer.querySelector('.badge')).toHaveClass('danger');
    expect(infoContainer.querySelector('.badge')).toHaveClass('info');
  });

  it('applies size class', () => {
    const { container } = render(<Badge size="lg">Large</Badge>);
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('lg');
  });

  it('applies sm size class', () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('sm');
  });

  it('renders dot when dot prop is true', () => {
    const { container } = render(<Badge dot>With Dot</Badge>);
    const dot = container.querySelector('.dot');
    expect(dot).toBeInTheDocument();
  });

  it('does not render dot when dot prop is false', () => {
    const { container } = render(<Badge dot={false}>No Dot</Badge>);
    const dot = container.querySelector('.dot');
    expect(dot).not.toBeInTheDocument();
  });

  it('displays count when count prop is provided', () => {
    const { container } = render(<Badge count={5}>With Count</Badge>);
    const count = container.querySelector('.count');
    expect(count).toBeInTheDocument();
    expect(count).toHaveTextContent('5');
  });

  it('does not display count when count is undefined', () => {
    const { container } = render(<Badge>No Count</Badge>);
    const count = container.querySelector('.count');
    expect(count).not.toBeInTheDocument();
  });

  it('displays maxCount+ when count exceeds maxCount', () => {
    const { container } = render(<Badge count={150} maxCount={99}>Exceeded</Badge>);
    const count = container.querySelector('.count');
    expect(count).toBeInTheDocument();
    expect(count).toHaveTextContent('99+');
  });

  it('uses default maxCount of 99', () => {
    const { container } = render(<Badge count={150}>Exceeded</Badge>);
    const count = container.querySelector('.count');
    expect(count).toHaveTextContent('99+');
  });

  it('displays exact count when less than maxCount', () => {
    const { container } = render(<Badge count={50} maxCount={99}>Under Limit</Badge>);
    const count = container.querySelector('.count');
    expect(count).toHaveTextContent('50');
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders both children, dot, and count', () => {
    const { container } = render(<Badge dot count={3}>All Features</Badge>);
    const badge = container.querySelector('.badge');
    const dot = container.querySelector('.dot');
    const count = container.querySelector('.count');
    
    expect(screen.getByText('All Features')).toBeInTheDocument();
    expect(dot).toBeInTheDocument();
    expect(count).toBeInTheDocument();
    expect(count).toHaveTextContent('3');
  });
});
