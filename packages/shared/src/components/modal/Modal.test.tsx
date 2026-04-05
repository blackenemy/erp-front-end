import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={jest.fn()} 
        footer={<button>Footer Button</button>}
      >
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });

  it('renders close button by default', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('does not render close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} showCloseButton={false}>
        <div>Content</div>
      </Modal>
    );
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Modal>
    );
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={true}>
        <div>Content</div>
      </Modal>
    );
    const overlay = container.querySelector('.overlay');
    fireEvent.click(overlay!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
        <div>Content</div>
      </Modal>
    );
    const overlay = container.querySelector('.overlay');
    fireEvent.click(overlay!);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when modal content is clicked', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={true}>
        <div>Modal Content</div>
      </Modal>
    );
    const modal = container.querySelector('.modal');
    fireEvent.click(modal!);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies size class', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={jest.fn()} size="lg">
        <div>Content</div>
      </Modal>
    );
    const modal = container.querySelector('.modal');
    expect(modal).toHaveClass('lg');
  });

  it('applies all size classes', () => {
    const { container: smContainer } = render(
      <Modal isOpen={true} onClose={jest.fn()} size="sm">
        <div>Content</div>
      </Modal>
    );
    const { container: xlContainer } = render(
      <Modal isOpen={true} onClose={jest.fn()} size="xl">
        <div>Content</div>
      </Modal>
    );
    const { container: fullContainer } = render(
      <Modal isOpen={true} onClose={jest.fn()} size="full">
        <div>Content</div>
      </Modal>
    );

    expect(smContainer.querySelector('.modal')).toHaveClass('sm');
    expect(xlContainer.querySelector('.modal')).toHaveClass('xl');
    expect(fullContainer.querySelector('.modal')).toHaveClass('full');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={jest.fn()} className="custom-modal">
        <div>Content</div>
      </Modal>
    );
    const modal = container.querySelector('.modal');
    expect(modal).toHaveClass('custom-modal');
  });

  it('sets body overflow to hidden when open', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Content</div>
      </Modal>
    );
    
    rerender(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Content</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('unset');
  });

  it('calls onClose when Escape key is pressed and closeOnEscape is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEscape={true}>
        <div>Content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape key is pressed and closeOnEscape is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEscape={false}>
        <div>Content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('cleans up event listeners on unmount', () => {
    const handleClose = jest.fn();
    const { unmount } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Modal>
    );
    unmount();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });
});
