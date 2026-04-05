import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders title correctly', () => {
    render(<Card title="Test Card" />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('renders description correctly', () => {
    render(<Card title="Title" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const { container } = render(
      <Card title="Card with Image" image="https://example.com/image.jpg" />
    );
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('uses imageAlt prop for alt text', () => {
    const { container } = render(
      <Card title="Card" image="https://example.com/image.jpg" imageAlt="Custom alt text" />
    );
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', 'Custom alt text');
  });

  it('uses title as fallback for alt text when imageAlt is not provided', () => {
    const { container } = render(
      <Card title="Card Title" image="https://example.com/image.jpg" />
    );
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', 'Card Title');
  });

  it('renders children', () => {
    render(
      <Card title="Parent Card">
        <button>Child Button</button>
      </Card>
    );
    expect(screen.getByText('Child Button')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Card title="Card" variant="outlined" />);
    const card = container.querySelector('.card');
    expect(card).toHaveClass('outlined');
  });

  it('applies all variant classes', () => {
    const { container: outlinedContainer } = render(<Card title="Card" variant="outlined" />);
    const { container: elevatedContainer } = render(<Card title="Card" variant="elevated" />);
    const { container: flatContainer } = render(<Card title="Card" variant="flat" />);

    expect(outlinedContainer.querySelector('.card')).toHaveClass('outlined');
    expect(elevatedContainer.querySelector('.card')).toHaveClass('elevated');
    expect(flatContainer.querySelector('.card')).toHaveClass('flat');
  });

  it('applies size class', () => {
    const { container } = render(<Card title="Card" size="lg" />);
    const card = container.querySelector('.card');
    expect(card).toHaveClass('lg');
  });

  it('applies sm size class', () => {
    const { container } = render(<Card title="Card" size="sm" />);
    const card = container.querySelector('.card');
    expect(card).toHaveClass('sm');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<Card title="Card" fullWidth />);
    const card = container.querySelector('.card');
    expect(card).toHaveClass('fullWidth');
  });

  it('applies clickable class when onClick is provided', () => {
    const { container } = render(<Card title="Card" onClick={jest.fn()} />);
    const card = container.querySelector('.card');
    expect(card).toHaveClass('clickable');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(<Card title="Clickable Card" onClick={handleClick} />);
    
    const card = container.querySelector('.card');
    fireEvent.click(card!);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not have clickable class when onClick is not provided', () => {
    const { container } = render(<Card title="Card" />);
    const card = container.querySelector('.card');
    expect(card).not.toHaveClass('clickable');
  });

  it('applies custom className', () => {
    const { container } = render(<Card title="Card" className="custom-class" />);
    const card = container.querySelector('.card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders all content: title, description, image, and children', () => {
    const { container } = render(
      <Card 
        title="Full Card"
        description="Full description"
        image="https://example.com/image.jpg"
      >
        <button>Action Button</button>
      </Card>
    );

    expect(screen.getByText('Full Card')).toBeInTheDocument();
    expect(screen.getByText('Full description')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });
});
