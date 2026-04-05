import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('rectangular');
  });

  it('applies variant class', () => {
    const { container } = render(<Skeleton variant="circular" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('circular');
  });

  it('applies all variant classes', () => {
    const { container: textContainer } = render(<Skeleton variant="text" />);
    const { container: circularContainer } = render(<Skeleton variant="circular" />);
    const { container: roundedContainer } = render(<Skeleton variant="rounded" />);

    expect(textContainer.querySelector('.skeleton')).toHaveClass('text');
    expect(circularContainer.querySelector('.skeleton')).toHaveClass('circular');
    expect(roundedContainer.querySelector('.skeleton')).toHaveClass('rounded');
  });

  it('applies custom width', () => {
    const { container } = render(<Skeleton width="200px" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ width: '200px' });
  });

  it('applies custom height', () => {
    const { container } = render(<Skeleton height="50px" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ height: '50px' });
  });

  it('applies numeric width', () => {
    const { container } = render(<Skeleton width={300} />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ width: '300px' });
  });

  it('applies numeric height', () => {
    const { container } = render(<Skeleton height={100} />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ height: '100px' });
  });

  it('applies both width and height', () => {
    const { container } = render(<Skeleton width="150px" height="75px" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ width: '150px', height: '75px' });
  });

  it('renders multiple skeletons when count > 1', () => {
    const { container } = render(<Skeleton count={3} />);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('renders container for multiple skeletons', () => {
    const { container } = render(<Skeleton count={2} />);
    const skeletonsContainer = container.querySelector('.container');
    expect(skeletonsContainer).toBeInTheDocument();
  });

  it('does not render container for single skeleton', () => {
    const { container } = render(<Skeleton count={1} />);
    const skeletonsContainer = container.querySelector('.container');
    expect(skeletonsContainer).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('has correct ARIA attributes for accessibility', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading...');
  });

  it('contains visually hidden text for screen readers', () => {
    const { container } = render(<Skeleton />);
    const hiddenText = container.querySelector('.visuallyHidden');
    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveTextContent('Loading...');
  });

  it('renders circular skeleton with same width and height for perfect circle', () => {
    const { container } = render(<Skeleton variant="circular" width={50} height={50} />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ width: '50px', height: '50px' });
  });

  it('renders text skeleton with default rectangular shape', () => {
    const { container } = render(<Skeleton variant="text" width="100%" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('text');
  });

  it('renders rounded skeleton', () => {
    const { container } = render(<Skeleton variant="rounded" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('rounded');
  });

  it('applies custom className to multiple skeletons', () => {
    const { container } = render(<Skeleton count={2} className="custom-class" />);
    const skeletons = container.querySelectorAll('.skeleton');
    skeletons.forEach(skeleton => {
      expect(skeleton).toHaveClass('custom-class');
    });
  });
});
