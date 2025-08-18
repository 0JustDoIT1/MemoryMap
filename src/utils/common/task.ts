// 동시성 제한 실행기
export const runWithConcurrency = async (
  jobs: Array<() => Promise<void>>, // 실행할 "비동기 작업 함수"들의 배열
  limit: number, // 동시에 실행할 최대 개수 (동시성 제한)
) => {
  const pool = Array.from(
    {length: Math.min(limit, jobs.length)}, // limit 또는 job 개수 중 작은 값만큼 워커 생성
    async () => {
      // 워커 하나 (비동기 함수)
      while (jobs.length) {
        const job = jobs.shift(); // jobs 배열에서 맨 앞의 작업 꺼내오기
        if (!job) break;
        await job(); // 작업 실행 (끝날 때까지 기다림)
      }
    },
  );

  await Promise.all(pool); // 모든 워커들이 끝날 때까지 기다림
};
