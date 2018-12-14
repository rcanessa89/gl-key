export default function actionCreator<A>(type: string): () => A
export default function actionCreator<A, P>(type: string): (P: P) => A;
export default function actionCreator (type: string) {
  return (payload?: any) => {
    const action: any = {
      type,
    };

    if (payload) {
      action.payload = payload;
    }

    return action;
  }
}
