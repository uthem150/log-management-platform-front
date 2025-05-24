import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${colors.lightGray};
  background-color: ${props =>
    props.active ? colors.primary : props.disabled ? colors.lightGray : colors.white};
  color: ${props => (props.active ? colors.white : props.disabled ? colors.gray : colors.text)};
  border-radius: 4px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 0.875rem;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: ${props => (props.active ? colors.primary : colors.lightGray)};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const PageInfo = styled.span`
  margin: 0 1rem;
  font-size: 0.875rem;
  color: ${colors.gray};
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  isLoading = false
}) => {
  // 표시할 페이지 번호들 계산
  const getVisiblePages = () => {
    const delta = 3; // 현재 페이지 앞뒤로 보여줄 페이지 수
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <PaginationContainer>
      {/* 이전 페이지 버튼 */}
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        ‹
      </PageButton>

      {/* 페이지 번호들 */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span style={{ padding: "0.5rem", color: colors.gray }}>...</span>
          ) : (
            <PageButton
              active={page === currentPage}
              onClick={() => onPageChange(page as number)}
              disabled={isLoading}
            >
              {page}
            </PageButton>
          )}
        </React.Fragment>
      ))}

      {/* 다음 페이지 버튼 */}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        ›
      </PageButton>

      {/* 페이지 정보 */}
      <PageInfo>
        {startItem}-{endItem} / {totalItems}개
      </PageInfo>
    </PaginationContainer>
  );
};

export default Pagination;
