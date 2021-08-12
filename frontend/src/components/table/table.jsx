import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ButtonComponent from '../button/button';
import PaginationComponent from '../pagination/pagination';

const TableData = styled.td`
	font-size: 14px;
	color: ${(props) => props.theme.lightBrown};
`;
const TableHead = styled.thead`
	position: sticky;
	top: 0;
	background: #fff;
`;
const TableWrapper = styled.div`
	position: relative;
	height: calc(100vh - 100px);
	overflow: auto;
`;
export default function TableComponent({ tableHeaders = [], tableData = [], dataItemMapping = [], isLoading = false, isActionButtonRequired = true, setCurrentItem, generateOtp, isActionLoading, count = 0, getData }) {
	function handleSendMessage(item) {
		setCurrentItem(item);
		generateOtp(item);
	}
	function handlePageChange(page) {
		getData(page.selected);
	}
	return (
		<>
			<TableWrapper>
				<table className='table table-hover table-responsive'>
					<TableHead>
						<tr>
							{tableHeaders.map((item, i) => (
								<TableData as='th' key={i} scope='col'>
									{item}
								</TableData>
								// <th key={i} scope='col'>
								// 	{item}
								// </th>
							))}
						</tr>
					</TableHead>
					<tbody>
						{tableData.map((item, i) => (
							<tr style={{ verticalAlign: 'middle' }} key={item._id}>
								<TableData as='th' scope='row'>
									{i + 1}
								</TableData>
								{dataItemMapping.map((key, j) => (
									<TableData key={j}>{item[key]}</TableData>
								))}
								{isActionButtonRequired && (
									<td style={{ textAlign: 'center' }}>
										<ButtonComponent onClick={() => handleSendMessage(item)} disabled={isActionLoading}>
											<span className='d-inline-block me-2'>
												<FontAwesomeIcon icon={faPaperPlane} />
											</span>
											<span className='text'>Send Message</span>
										</ButtonComponent>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</TableWrapper>
			{count > 1 && (
				<div className='d-flex justify-content-center'>
					<PaginationComponent handlePageChange={handlePageChange} count={count} />
				</div>
			)}
		</>
	);
}
