import { render, screen } from '@testing-library/react';
import { Form, FormItem } from './Form';

describe('Form', () => {
  it('renders children correctly', () => {
    render(
      <Form>
        <div>Form Content</div>
      </Form>
    );
    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });

  it('renders form element', () => {
    const { container } = render(
      <Form>
        <div>Content</div>
      </Form>
    );
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('applies default layout class', () => {
    const { container } = render(
      <Form>
        <div>Content</div>
      </Form>
    );
    const form = container.querySelector('.form');
    expect(form).toHaveClass('vertical');
  });

  it('applies custom layout class', () => {
    const { container } = render(
      <Form layout="horizontal">
        <div>Content</div>
      </Form>
    );
    const form = container.querySelector('.form');
    expect(form).toHaveClass('horizontal');
  });

  it('applies inline layout class', () => {
    const { container } = render(
      <Form layout="inline">
        <div>Content</div>
      </Form>
    );
    const form = container.querySelector('.form');
    expect(form).toHaveClass('inline');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Form className="custom-form">
        <div>Content</div>
      </Form>
    );
    const form = container.querySelector('.form');
    expect(form).toHaveClass('custom-form');
  });

  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    const form = container.querySelector('form')!;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('prevents default form submission', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    const { container } = render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    const form = container.querySelector('form')!;
    const mockEvent = { preventDefault: jest.fn() };
    handleSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('provides context with layout props', () => {
    const TestComponent = () => {
      return <div data-testid="test">Content</div>;
    };
    render(
      <Form layout="horizontal" labelAlign="right" labelCol={4} wrapperCol={20}>
        <TestComponent />
      </Form>
    );
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});

describe('FormItem', () => {
  it('renders children correctly', () => {
    render(
      <Form>
        <FormItem>
          <input type="text" />
        </FormItem>
      </Form>
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <Form>
        <FormItem label="Username">
          <input type="text" />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders required asterisk when required is true', () => {
    render(
      <Form>
        <FormItem label="Email" required>
          <input type="text" />
        </FormItem>
      </Form>
    );
    const requiredAsterisk = screen.getByText('*');
    expect(requiredAsterisk).toBeInTheDocument();
    expect(requiredAsterisk).toHaveClass('required');
  });

  it('does not render required asterisk when required is false', () => {
    render(
      <Form>
        <FormItem label="Email" required={false}>
          <input type="text" />
        </FormItem>
      </Form>
    );
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(
      <Form>
        <FormItem label="Email" error="Email is required">
          <input type="text" />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('renders help text when provided', () => {
    render(
      <Form>
        <FormItem label="Password" help="Must be at least 8 characters">
          <input type="password" />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders error instead of help when both are provided', () => {
    render(
      <Form>
        <FormItem 
          label="Email" 
          error="Email is required" 
          help="Enter your email"
        >
          <input type="text" />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
  });

  it('applies error class when error is provided', () => {
    const { container } = render(
      <Form>
        <FormItem label="Email" error="Error message">
          <input type="text" />
        </FormItem>
      </Form>
    );
    const error = container.querySelector('.error');
    expect(error).toBeInTheDocument();
  });

  it('applies help class when help is provided', () => {
    const { container } = render(
      <Form>
        <FormItem label="Password" help="Help text">
          <input type="password" />
        </FormItem>
      </Form>
    );
    const help = container.querySelector('.help');
    expect(help).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Form>
        <FormItem className="custom-item">
          <input type="text" />
        </FormItem>
      </Form>
    );
    const formItem = container.querySelector('.formItem');
    expect(formItem).toHaveClass('custom-item');
  });

  it('renders inline layout when Form layout is inline', () => {
    const { container } = render(
      <Form layout="inline">
        <FormItem label="Name">
          <input type="text" />
        </FormItem>
      </Form>
    );
    const formItem = container.querySelector('.formItem');
    expect(formItem).toHaveClass('inline');
  });

  it('respects context layout prop for non-inline layouts', () => {
    const { container } = render(
      <Form layout="horizontal" labelCol={4} wrapperCol={20}>
        <FormItem label="Name">
          <input type="text" />
        </FormItem>
      </Form>
    );
    const labelWrapper = container.querySelector('.labelWrapper');
    const wrapper = container.querySelector('.wrapper');
    expect(labelWrapper).toHaveStyle({ flex: '4' });
    expect(wrapper).toHaveStyle({ flex: '20' });
  });
});
