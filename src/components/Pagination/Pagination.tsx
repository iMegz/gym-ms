import style from "./Pagination.module.css";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";

interface PaginationProps {
    pagesCount: number;
    currentPage: number;
    changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    pagesCount,
    changePage,
}) => {
    function prev() {
        if (currentPage !== 1) changePage(currentPage - 1);
    }

    function next() {
        if (currentPage !== pagesCount) changePage(currentPage + 1);
    }

    function showPageNumber(page: number) {
        return (
            <li
                key={page}
                className={page === currentPage ? style.active : ""}
                onClick={() => currentPage !== page && changePage(page)}
            >
                {page}
            </li>
        );
    }

    function showPages() {
        if (pagesCount < 11) {
            return Array.from({ length: pagesCount }, (_, i) => {
                return showPageNumber(i + 1);
            });
        } else {
            let flagPre = false;
            let flagPost = false;
            return Array.from({ length: pagesCount }, (_, i) => {
                if (
                    i < 2 || // First 2 pages
                    i > pagesCount - 3 || // Last 2 pages
                    (i > currentPage - 3 && i < currentPage + 1)

                    // 17
                ) {
                    return showPageNumber(i + 1);
                } else {
                    if (!flagPre && i + 1 < currentPage) {
                        flagPre = true;
                        return (
                            <li
                                key="hidden-pre"
                                className={style["hidden-pages"]}
                            >
                                ...
                            </li>
                        );
                    } else if (!flagPost && i + 1 > currentPage) {
                        flagPost = true;
                        return (
                            <li
                                key="hidden-post"
                                className={style["hidden-pages"]}
                            >
                                ...
                            </li>
                        );
                    }
                }
            });
        }
    }

    return (
        <div className={style.pagination}>
            <RiArrowLeftSFill
                onClick={prev}
                className={currentPage === 1 ? style["inactive-arrow"] : ""}
            />
            <ul>{showPages()}</ul>
            <RiArrowRightSFill
                onClick={next}
                className={
                    currentPage === pagesCount ? style["inactive-arrow"] : ""
                }
            />
        </div>
    );
};

export default Pagination;
