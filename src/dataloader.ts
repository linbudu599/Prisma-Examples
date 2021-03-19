// 每一个任务包含这些属性 可以理解为前面迷你实现的Task
interface Job {
  resolve: (data: any) => void;
  reject: (data: any) => void;
  request: any;
}

export type DataloaderOptions<T> = {
  singleLoader: (request: T) => Promise<any>;
  batchLoader: (request: T[]) => Promise<any[]>;
  // 批处理的标识符 标识各个batch
  batchBy: (request: T) => string | null;
};

export class Dataloader<T = any> {
  batches: { [key: string]: Job[] };
  private tickActive = false;
  constructor(private options: DataloaderOptions<T>) {
    this.batches = {};
  }

  get [Symbol.toStringTag]() {
    return "Dataloader";
  }

  request(request: T): Promise<any> {
    // 获得当前batch的标识符
    const hash = this.options.batchBy(request);
    if (!hash) {
      // 如果不需要使用批处理, 直接使用singleLoader
      return this.options.singleLoader(request);
    }
    // 如果是全新的batch, 声明一个新的命名空间(this.batchers[hash])存储需要批量执行的任务
    if (!this.batches[hash]) {
      this.batches[hash] = [];

      // make sure, that we only tick once at a time
      // 将新的batch对应的加入到未来执行(enqueuePostPromiseJob)
      if (!this.tickActive) {
        this.tickActive = true;
        process.nextTick(() => {
          this.dispatchBatches();
          this.tickActive = false;
        });
      }
    }

    return new Promise((resolve, reject) => {
      // 添加任务到对应batch的命名空间下
      this.batches[hash].push({
        request,
        resolve,
        reject,
      });
    });
  }

  private dispatchBatches() {
    for (const key in this.batches) {
      const batch = this.batches[key];
      delete this.batches[key];

      // only batch if necessary
      // this might occur, if there's e.g. only 1 findUnique in the batch
      // 当batch下仅存在一个任务时, 只使用singleLoader
      if (batch.length === 1) {
        this.options
          .singleLoader(batch[0].request)
          .then((result) => {
            if (result instanceof Error) {
              batch[0].reject(result);
            } else {
              batch[0].resolve(result);
            }
          })
          .catch((e) => {
            batch[0].reject(e);
          });
      } else {
        // 使用batchLoader
        this.options
          .batchLoader(batch.map((j) => j.request))
          .then((results) => {
            if (results instanceof Error) {
              for (let i = 0; i < batch.length; i++) {
                batch[i].reject(results);
              }
            } else {
              // 遍历resolve/reject
              for (let i = 0; i < batch.length; i++) {
                const value = results[i];
                if (value instanceof Error) {
                  batch[i].reject(value);
                } else {
                  batch[i].resolve(value);
                }
              }
            }
          })
          .catch((e) => {
            for (let i = 0; i < batch.length; i++) {
              batch[i].reject(e);
            }
          });
      }
    }
  }
}
