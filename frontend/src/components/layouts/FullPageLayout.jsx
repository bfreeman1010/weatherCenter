import { GREY_BG } from '../../theme';

export default function FullPageLayout({ children }) {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: GREY_BG }}>
      {children}
    </div>
  );
}
