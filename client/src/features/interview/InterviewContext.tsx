import React, {
  createContext,
  useState,
  type ReactNode,
} from "react";

import type {
  InterviewReport,
  InterviewReportData,
} from "../../type/type";

interface ReportProviderProps {
  children: ReactNode;
}

interface ReportContextType {
  report: InterviewReportData | null;

  setReport: React.Dispatch<
    React.SetStateAction<InterviewReportData | null>
  >;

  reports: InterviewReport[];

  setReports: React.Dispatch<
    React.SetStateAction<InterviewReport[]>
  >;

  loading: boolean;

  setloading: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const ReportContext =
  createContext<ReportContextType | null>(null);

const ReportContextProvider = ({
  children,
}: ReportProviderProps) => {
  const [report, setReport] =
    useState<InterviewReportData | null>(null);

  const [reports, setReports] = useState<
    InterviewReport[]
  >([]);

  const [loading, setloading] =
    useState<boolean>(false);

  return (
    <ReportContext.Provider
      value={{
        report,
        setReport,
        reports,
        setReports,
        loading,
        setloading,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContextProvider;