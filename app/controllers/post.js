let postId = 1; // id의 초기값 입니다

const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용'
    }
];

/* 포스트 작성
   POST /api/posts
   { title, body } */
exports.write = (ctx) => {
    // REST API의 request body 는 ctx.request.body 에서 조회 할 수 있습니다.
    const {
        title,
        body
    } = ctx.request.body;

    postId += 1; // 기존의 postId 값에 1을 더합니다

    const post = { id: postId, title, body };
    posts.push(post);
    ctx.body = post;
};

/* 포스트 목록 조회
   GET /api/posts */
exports.list = (ctx) => {
    ctx.body = posts;
};

/* 특정 포스트 조회
   GET /api/posts/:id */
exports.read = (ctx) => {
    const { id } = ctx.params;

    // 주어진 id 값으로 포스트를 찾습니다
    // 파라미터로 받아온 값은 문자열 형식이니, 파라미터를 숫자로 변환하거나,
    // 비교 할 p.id 값을 문자열로 변경해야합니다.
    const post = posts.find(p => p.id.toString() === id);

    // 포스트가 없을 경우 에러를 반환합니다.
    if (!post) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        };
        return;
    }

    ctx.body = post;
};

/* 특정 포스트 제거
   DELETE /api/posts/:id */
exports.remove = (ctx) => {
    const { id } = ctx.params;

    // 해당 id 를 가진 post 가 몇번째인지 확인합니다
    const index = posts.findIndex(p => p.id.toString() === id);

    // 포스트가 없을 경우 에러를 반환합니다.
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        };
        return;
    }

    // index 번째 아이템을 제거합니다.
    posts.splice(index, 1);
    ctx.status = 204; // No Content
};

/* 포스트 수정 (교체)
  PUT /api/posts/:id
  { title, body } */
exports.replace = (ctx) => {
    // PUT 메소드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체 할 때에 사용됩니다.
    const { id } = ctx.params;

    // 해당 id 를 가진 post 가 몇번째인지 확인합니다
    const index = posts.findIndex(p => p.id.toString() === id);

    // 포스트가 없을 경우 에러를 반환합니다.
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        };
        return;
    }

    // 전체 객체를 덮어씌웁니다.
    // 따라서, id 를 제외한 기존 정보를 날리고, 객체를 새로 생성합니다.
    posts[index] = {
        id,
        ...ctx.request.body
    };
    ctx.body = posts[index];
};

/* 포스트 수정 (특정 필드 변경)
   PATCH /api/posts/:id
   { title, body } */
exports.update = (ctx) => {
    // PATCH 메소드는 주어진 필드만 교체합니다.
    const { id } = ctx.params;

    // 해당 id 를 가진 post 가 몇번째인지 확인합니다
    const index = posts.findIndex(p => p.id.toString() === id);

    // 포스트가 없을 경우 에러를 반환합니다.
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        };
        return;
    }

    // 기존의 값에 정보를 덮어 씌웁니다.
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    };
    ctx.body = posts[index];
};