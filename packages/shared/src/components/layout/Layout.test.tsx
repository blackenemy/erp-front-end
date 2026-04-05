import { render, screen, fireEvent } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Layout className="custom-layout">Content</Layout>);
    const layout = container.querySelector('.layout');
    expect(layout).toHaveClass('custom-layout');
  });

  it('applies custom style', () => {
    const { container } = render(<Layout style={{ backgroundColor: 'red' }}>Content</Layout>);
    const layout = container.querySelector('.layout');
    expect(layout).toHaveStyle({ backgroundColor: 'red' });
  });

  it('detects Sider and applies hasSider class', () => {
    const { container } = render(
      <Layout>
        <Layout.Sider>Sidebar</Layout.Sider>
        <Layout.Content>Main</Layout.Content>
      </Layout>
    );
    const layout = container.querySelector('.layout');
    expect(layout).toHaveClass('hasSider');
  });

  it('does not apply hasSider class when no Sider is present', () => {
    const { container } = render(
      <Layout>
        <Layout.Content>Main</Layout.Content>
      </Layout>
    );
    const layout = container.querySelector('.layout');
    expect(layout).not.toHaveClass('hasSider');
  });

  describe('Layout.Sider', () => {
    it('renders Sider content', () => {
      render(
        <Layout>
          <Layout.Sider>Sidebar Content</Layout.Sider>
        </Layout>
      );
      expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
    });

    it('applies custom width', () => {
      const { container } = render(
        <Layout>
          <Layout.Sider width={300}>Sidebar</Layout.Sider>
        </Layout>
      );
      const sider = container.querySelector('.sider');
      expect(sider).toHaveStyle({ width: '300px' });
    });

    it('applies string width', () => {
      const { container } = render(
        <Layout>
          <Layout.Sider width="50%">Sidebar</Layout.Sider>
        </Layout>
      );
      const sider = container.querySelector('.sider');
      expect(sider).toHaveStyle({ width: '50%' });
    });

    it('renders collapse button when collapsible is true', () => {
      render(
        <Layout>
          <Layout.Sider collapsible>Sidebar</Layout.Sider>
        </Layout>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('does not render collapse button when collapsible is false', () => {
      const { container } = render(
        <Layout>
          <Layout.Sider collapsible={false}>Sidebar</Layout.Sider>
        </Layout>
      );
      const collapseButton = container.querySelector('.collapseButton');
      expect(collapseButton).not.toBeInTheDocument();
    });

    it('applies collapsed class when collapsed is true', () => {
      const { container } = render(
        <Layout>
          <Layout.Sider collapsed>Sidebar</Layout.Sider>
        </Layout>
      );
      const sider = container.querySelector('.sider');
      expect(sider).toHaveClass('collapsed');
    });

    it('adjusts width when collapsed', () => {
      const { container } = render(
        <Layout>
          <Layout.Sider width={256} collapsed>Sidebar</Layout.Sider>
        </Layout>
      );
      const sider = container.querySelector('.sider');
      expect(sider).toHaveStyle({ width: '80px' });
    });

    it('calls onCollapse when collapse button is clicked', () => {
      const handleCollapse = jest.fn();
      render(
        <Layout>
          <Layout.Sider collapsible onCollapse={handleCollapse}>Sidebar</Layout.Sider>
        </Layout>
      );
      const collapseButton = screen.getByRole('button');
      fireEvent.click(collapseButton);
      expect(handleCollapse).toHaveBeenCalledWith(true);
    });

    it('has correct ARIA label for collapse button when expanded', () => {
      render(
        <Layout>
          <Layout.Sider collapsible collapsed={false}>Sidebar</Layout.Sider>
        </Layout>
      );
      const collapseButton = screen.getByRole('button');
      expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    });

    it('has correct ARIA label for collapse button when collapsed', () => {
      render(
        <Layout>
          <Layout.Sider collapsible collapsed>Sidebar</Layout.Sider>
        </Layout>
      );
      const collapseButton = screen.getByRole('button');
      expect(collapseButton).toHaveAttribute('aria-label', 'Expand sidebar');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Layout>
          <Layout.Sider className="custom-sider">Sidebar</Layout.Sider>
        </Layout>
      );
      const sider = container.querySelector('.sider');
      expect(sider).toHaveClass('custom-sider');
    });

    it('applies custom style', () => {
      const { container } = render(
        <Layout>
          <Layout.Sider style={{ backgroundColor: 'blue' }}>Sidebar</Layout.Sider>
        </Layout>
      );
      const sider = container.querySelector('.sider');
      expect(sider).toHaveStyle({ backgroundColor: 'blue' });
    });
  });

  describe('Layout.Header', () => {
    it('renders Header content', () => {
      render(
        <Layout>
          <Layout.Header>Header Content</Layout.Header>
        </Layout>
      );
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies fixed class when fixed is true', () => {
      const { container } = render(
        <Layout>
          <Layout.Header fixed>Header</Layout.Header>
        </Layout>
      );
      const header = container.querySelector('.header');
      expect(header).toHaveClass('fixed');
    });

    it('does not apply fixed class when fixed is false', () => {
      const { container } = render(
        <Layout>
          <Layout.Header fixed={false}>Header</Layout.Header>
        </Layout>
      );
      const header = container.querySelector('.header');
      expect(header).not.toHaveClass('fixed');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Layout>
          <Layout.Header className="custom-header">Header</Layout.Header>
        </Layout>
      );
      const header = container.querySelector('.header');
      expect(header).toHaveClass('custom-header');
    });

    it('applies custom style', () => {
      const { container } = render(
        <Layout>
          <Layout.Header style={{ backgroundColor: 'green' }}>Header</Layout.Header>
        </Layout>
      );
      const header = container.querySelector('.header');
      expect(header).toHaveStyle({ backgroundColor: 'green' });
    });
  });

  describe('Layout.Content', () => {
    it('renders Content as main element', () => {
      const { container } = render(
        <Layout>
          <Layout.Content>Main Content</Layout.Content>
        </Layout>
      );
      const content = container.querySelector('main');
      expect(content).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Layout>
          <Layout.Content className="custom-content">Content</Layout.Content>
        </Layout>
      );
      const content = container.querySelector('.content');
      expect(content).toHaveClass('custom-content');
    });

    it('applies custom style', () => {
      const { container } = render(
        <Layout>
          <Layout.Content style={{ padding: '20px' }}>Content</Layout.Content>
        </Layout>
      );
      const content = container.querySelector('.content');
      expect(content).toHaveStyle({ padding: '20px' });
    });
  });

  describe('Layout.Footer', () => {
    it('renders Footer as footer element', () => {
      const { container } = render(
        <Layout>
          <Layout.Footer>Footer Content</Layout.Footer>
        </Layout>
      );
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Layout>
          <Layout.Footer className="custom-footer">Footer</Layout.Footer>
        </Layout>
      );
      const footer = container.querySelector('.footer');
      expect(footer).toHaveClass('custom-footer');
    });

    it('applies custom style', () => {
      const { container } = render(
        <Layout>
          <Layout.Footer style={{ backgroundColor: 'gray' }}>Footer</Layout.Footer>
        </Layout>
      );
      const footer = container.querySelector('.footer');
      expect(footer).toHaveStyle({ backgroundColor: 'gray' });
    });
  });

  it('renders complete layout structure', () => {
    const { container } = render(
      <Layout>
        <Layout.Sider>Sidebar</Layout.Sider>
        <Layout>
          <Layout.Header>Header</Layout.Header>
          <Layout.Content>Content</Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
      </Layout>
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
