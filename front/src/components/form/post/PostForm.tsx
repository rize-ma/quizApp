import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';

export const PostForm = () => {
  return (
    <div className="w-full m-5 p-1 lg:m-10 lg:p-5 md:m-5 md:p-2">
      <h1 className="text-2xl">クイズを投稿</h1>
      <div className="mt-10">
        <div>
          <Label>問題文</Label>
          <Textarea
            className="rounded-xl mt-1 w-full min-h-32 text-lg"
            placeholder="問題文を入力してください"
          />
        </div>
        <div className="mt-8">
          <div>
            <Label>選択肢1</Label>
            <Textarea className="rounded-xl mt-1" placeholder="選択肢1を入力" />
          </div>
          <div className="mt-5">
            <Label>選択肢2</Label>
            <Textarea className="rounded-xl mt-1" placeholder="選択肢2を入力" />
          </div>
          <div className="mt-5">
            <Label>選択肢3</Label>
            <Textarea className="rounded-xl mt-1" placeholder="選択肢3を入力" />
          </div>
          <div className="mt-5">
            <Label>選択肢4</Label>
            <Textarea className="rounded-xl mt-1" placeholder="選択肢4を入力" />
          </div>
        </div>
        <div className="mt-10 flex md:justify-end">
          <Button className="w-full md:w-48" type="submit">
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
};
