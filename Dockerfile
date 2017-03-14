FROM mhart/alpine-node

ENV PATH /root/.yarn/bin:$PATH
RUN apk update \
  && apk add curl bash binutils tar \
  && rm -rf /var/cache/apk/* \
  && /bin/bash \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && apk del curl tar binutils

WORKDIR /opt/eye
ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install
ADD . .

ENV NODE_ENV production

ENTRYPOINT ["/root/.yarn/bin/yarn", "build", "&&", "/root/.yarn/bin/yarn", "run", "start"]
