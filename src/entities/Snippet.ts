export class Snippet {
  readonly id: string;
  readonly title: string;
  readonly content: string;

  constructor({
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}
