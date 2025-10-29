import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlTabIndex(defaultIndex = 0) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const tabIndex = tabParam ? parseInt(tabParam, 10) : defaultIndex;

  const setTabIndex = (newIndex: number) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.set("tab", String(newIndex));

    const newUrl = `${pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  return [tabIndex, setTabIndex] as const;
}
