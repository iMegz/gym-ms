import { useEffect, useState } from "react";
import style from "./Logs.module.css";
import { DashboardProps } from "../Dashboard";
import logTypes, { LogType } from "./LogTypes";
import Pagination from "../../../components/Pagination/Pagination";

interface Log {
    log: string;
    time: number;
    type: LogType;
}

const logs: Log[] = [
    {
        log: "Member Ali mohamed was added by Hosam ibrahim",
        time: Date.now() - 12000,
        type: "memberAdd",
    },
    {
        log: "Member Ahmed Magdi was added by Hosam ibrahim",
        time: Date.now() - 9854,
        type: "memberAdd",
    },
    {
        log: "Member Ismail was added by Hosam ibrahim",
        time: Date.now() - 7526,
        type: "memberAdd",
    },
    {
        log: "Member Ahmed magdi freezed his account",
        time: Date.now(),
        type: "memberFreeze",
    },
];

const Logs: React.FC<DashboardProps> = ({ loaded }) => {
    const [page, setPage] = useState(1);

    const pagesCount = 20;

    function changePage(page: number) {
        setPage(page);
    }

    useEffect(() => {
        loaded();
    }, []);

    return (
        <>
            <h1>Logs</h1>
            {/* Filter */}
            <div className={style.filter}>
                <h2>Filter</h2>
                <div className={style.filters}>
                    <div>
                        <label htmlFor="from">From : </label>
                        <input id="from" type="date" />
                    </div>
                    <div>
                        <label htmlFor="to">To : </label>
                        <input id="to" type="date" />
                    </div>
                    <div>
                        <label htmlFor="logType">Log type :</label>
                        <select id="logType">
                            <option value="all">All</option>
                            {logTypes.map((type) => {
                                return (
                                    <optgroup
                                        key={type.label}
                                        label={type.label}
                                    >
                                        {type.types.map((option) => {
                                            return (
                                                <option value={option.value}>
                                                    {option.label}
                                                </option>
                                            );
                                        })}
                                    </optgroup>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>

            {/* Logs */}
            <div className={style.logs}>
                <h2>Logs</h2>
                <ul>
                    {logs.map((log) => (
                        <li key={log.time.toString(36)}>
                            <span>{log.log}</span>
                            <span>{new Date(log.time).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
                <Pagination
                    pagesCount={pagesCount}
                    currentPage={page}
                    changePage={changePage}
                />
            </div>
        </>
    );
};

export default Logs;
