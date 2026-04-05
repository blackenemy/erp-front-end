import { render, screen, fireEvent } from '@testing-library/react';
import { Table, Column } from './Table';

interface TestData {
  id: number;
  name: string;
  age: number;
}

const mockData: TestData[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

const mockColumns: Column<TestData>[] = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
];

describe('Table', () => {
  it('renders table with data', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders empty state when data is empty', () => {
    render(<Table data={[]} columns={mockColumns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders custom empty state', () => {
    render(<Table data={[]} columns={mockColumns} empty={<div>Custom Empty</div>} />);
    expect(screen.getByText('Custom Empty')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<Table data={mockData} columns={mockColumns} loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('does not render table when loading', () => {
    const { container } = render(<Table data={mockData} columns={mockColumns} loading />);
    const table = container.querySelector('table');
    expect(table).not.toBeInTheDocument();
  });

  it('calls onRowClick when row is clicked', () => {
    const handleRowClick = jest.fn();
    render(<Table data={mockData} columns={mockColumns} onRowClick={handleRowClick} />);
    
    const rows = screen.getAllByRole('row');
    fireEvent.click(rows[1]);
    
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0], 0);
  });

  it('applies clickableRow class when onRowClick is provided', () => {
    const { container } = render(<Table data={mockData} columns={mockColumns} onRowClick={jest.fn()} />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).toHaveClass('clickableRow');
  });

  it('does not apply clickableRow class when onRowClick is not provided', () => {
    const { container } = render(<Table data={mockData} columns={mockColumns} />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).not.toHaveClass('clickableRow');
  });

  it('applies column width', () => {
    const columns = [
      { key: 'id' as const, title: 'ID', width: '100px' },
      { key: 'name' as const, title: 'Name', width: '200px' },
    ];
    const { container } = render(<Table data={mockData} columns={columns} />);
    const headers = container.querySelectorAll('th');
    expect(headers[0]).toHaveStyle({ width: '100px' });
    expect(headers[1]).toHaveStyle({ width: '200px' });
  });

  it('applies column alignment', () => {
    const columns: Column<TestData>[] = [
      { key: 'name', title: 'Name', align: 'left' },
      { key: 'age', title: 'Age', align: 'right' },
      { key: 'id', title: 'ID', align: 'center' },
    ];
    const { container } = render(<Table data={mockData} columns={columns} />);
    const headers = container.querySelectorAll('th');
    expect(headers[0]).toHaveClass('left');
    expect(headers[1]).toHaveClass('right');
    expect(headers[2]).toHaveClass('center');
  });

  it('calls onSort when sortable column header is clicked', () => {
    const handleSort = jest.fn();
    const columns = [
      { key: 'name' as const, title: 'Name', sortable: true },
      { key: 'age' as const, title: 'Age' },
    ];
    render(<Table data={mockData} columns={columns} onSort={handleSort} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('does not call onSort when non-sortable column header is clicked', () => {
    const handleSort = jest.fn();
    const columns = [
      { key: 'name' as const, title: 'Name' },
      { key: 'age' as const, title: 'Age' },
    ];
    render(<Table data={mockData} columns={columns} onSort={handleSort} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    expect(handleSort).not.toHaveBeenCalled();
  });

  it('shows sort icon for sortable columns', () => {
    const columns = [
      { key: 'name' as const, title: 'Name', sortable: true },
      { key: 'age' as const, title: 'Age' },
    ];
    const { container } = render(<Table data={mockData} columns={columns} />);
    const sortIcons = container.querySelectorAll('.sortIcon');
    expect(sortIcons).toHaveLength(1);
  });

  it('renders custom cell using render function', () => {
    const columns = [
      { key: 'name' as const, title: 'Name', render: (value: string) => <strong>{value}</strong> },
      { key: 'age' as const, title: 'Age' },
    ];
    const { container } = render(<Table data={mockData} columns={columns} />);
    const boldName = container.querySelector('strong');
    expect(boldName).toHaveTextContent('Alice');
  });

  it('renders pagination when provided', () => {
    const pagination = {
      current: 1,
      pageSize: 10,
      total: 100,
      onChange: jest.fn(),
    };
    const { container } = render(<Table data={mockData} columns={mockColumns} pagination={pagination} />);
    expect(screen.getByText('Showing 1 to 10 of 100')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(container.querySelector('.pageNumber')).toHaveTextContent('1');
  });

  it('disables previous button on first page', () => {
    const pagination = {
      current: 1,
      pageSize: 10,
      total: 100,
      onChange: jest.fn(),
    };
    render(<Table data={mockData} columns={mockColumns} pagination={pagination} />);
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const pagination = {
      current: 10,
      pageSize: 10,
      total: 100,
      onChange: jest.fn(),
    };
    render(<Table data={mockData} columns={mockColumns} pagination={pagination} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onChange when pagination buttons are clicked', () => {
    const handleChange = jest.fn();
    const pagination = {
      current: 2,
      pageSize: 10,
      total: 100,
      onChange: handleChange,
    };
    render(<Table data={mockData} columns={mockColumns} pagination={pagination} />);
    
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    
    expect(handleChange).toHaveBeenCalledWith(1, 10);
  });

  it('uses custom rowKey function', () => {
    const customRowKey = (record: TestData) => `custom-${record.id}`;
    render(
      <Table data={mockData} columns={mockColumns} rowKey={customRowKey} />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Table data={mockData} columns={mockColumns} className="custom-table" />
    );
    const tableContainer = container.querySelector('.container');
    expect(tableContainer).toHaveClass('custom-table');
  });
});
